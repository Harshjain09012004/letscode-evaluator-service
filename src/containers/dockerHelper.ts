import Dockerode from "dockerode";
import DockerStreamOutput from "../types/dockerStreamOutput";

import { DOCKER_STREAM_HEADER_SIZE } from "../utils/constants";

export function decodeDockerStream(buffer : Buffer) : DockerStreamOutput{
    //Contain current position in buffer stream while parsing
    let offset = 0; 

    //It represent the output object containing stdout and stderr
    const output : DockerStreamOutput = {stdout: '', stderr: ''};

    while(offset<buffer.length){
        //Channel denotes the type of stream i.e. stdout or stderr
        const typeOfStream = buffer[offset];

        //The length variable hold the length of data
        //We will read this variable on an offset of 4 bytes from the start of the chunk
        const length = buffer.readUInt32BE(offset + 4); 

        //Now we have read the header, we can move forward to the value of the chunk
        offset+=DOCKER_STREAM_HEADER_SIZE;

        if(typeOfStream === 1){
            output.stdout += buffer.toString('utf-8', offset, offset + length);
        } else if(typeOfStream === 2){
            output.stderr += buffer.toString('utf-8', offset, offset + length);
        }

        offset+=length;
    }
    return output;
};

export async function bindLoggerToContainer(container : Dockerode.Container, rawLogBuffer : Buffer[], timeLimit : number) : Promise<DockerStreamOutput>{
    const loggerStream = await container.logs({
        stdout: true,
        stderr: true,
        follow: true,
        timestamps: false
    });

    loggerStream.on('data', (chunk)=>{
        rawLogBuffer.push(chunk);
    });

    loggerStream.on('error', (chunk)=>{
        console.log(chunk);
    });

    const codeResponse : DockerStreamOutput = await new Promise((res)=>{
        //Time Limit Exceeded Handler Timeout
        const timerId = setTimeout(async () => {
            await container.kill();
            res({
                stdout : "",
                stderr : "Time Limit Exceeded"
            });
        }, timeLimit);

        loggerStream.on('end', ()=>{
            clearTimeout(timerId);

            console.log(rawLogBuffer);

            const completeBuffer = Buffer.concat(rawLogBuffer);
            const decodedStream = decodeDockerStream(completeBuffer);

            console.log(decodedStream);
            res(decodedStream);
        });
    });

    return codeResponse;
};