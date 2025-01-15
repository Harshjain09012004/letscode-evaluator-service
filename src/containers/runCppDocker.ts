import { CPP_IMAGE } from "../utils/constants";
import createContainer from "./containerFactory";
import decodeDockerStream from "./dockerHelper";
import pullImage from "./pullImage";

async function runCpp(code : string, inputData : string){
    const rawLogBuffer : Buffer[] = [];

    console.log("Initialising a new CPP Container");

    //Pull Image if don't exist in docker
    await pullImage(CPP_IMAGE);

    
    // Code & InputData should be wrapped inside single quotes
    // To remove the confusion with single quotes we replace them with double quotes
    const runCommands = `echo '${code.replace(/'/g, `"`)}' > main.cpp && g++ main.cpp -o main && echo '${inputData.replace(/'/g, `"`)}' | ./main`;

    // Below statment allow us to pass inputData while executing the code
    // /bin/sh tells the OS to run the command as bash script rather a normal statement
    // As commands includes echo so it becomes a bash script
    const cppDockerContainer = await createContainer(CPP_IMAGE,['/bin/sh', '-c', runCommands]);

    // For starting and booting the python container
    await cppDockerContainer.start();

    console.log("Started The Docker Container");

    const loggerStream = await cppDockerContainer.logs({
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

    loggerStream.on('end', async ()=>{
        console.log(rawLogBuffer);

        const completeBuffer = Buffer.concat(rawLogBuffer);
        const decodedStream = decodeDockerStream(completeBuffer);

        console.log(decodedStream);

        await cppDockerContainer.remove();
    });
    
    return cppDockerContainer;
}

export default runCpp;