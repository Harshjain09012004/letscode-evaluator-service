import { JAVA_IMAGE } from "../utils/constants";
import createContainer from "./containerFactory";
import decodeDockerStream from "./dockerHelper";
import pullImage from "./pullImage";

async function runJava(code : string, inputData : string){
    const rawLogBuffer : Buffer[] = [];

    console.log("Initialising a new Java Container");

    //Pull Image if don't exist in docker
    pullImage(JAVA_IMAGE);

    // Code & InputData should be wrapped inside single quotes
    // To remove the confusion with single quotes we replace them with double quotes

    const runCommands = `echo '${code.replace(/'/g, `"`)}' > Main.java && javac Main.java && echo '${inputData.replace(/'/g, `"`)}' | java Main`;

    // Below statment allow us to pass inputData while executing the code
    // /bin/sh tells the OS to run the command as bash script rather a normal statement
    // As commands includes echo so it becomes a bash script
    const javaDockerContainer = await createContainer(JAVA_IMAGE,['/bin/sh', '-c', runCommands]);

    // For starting and booting the java container
    await javaDockerContainer.start();

    console.log("Started The Docker Container");

    const loggerStream = await javaDockerContainer.logs({
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

        await javaDockerContainer.remove();
    });
    
    return javaDockerContainer;
}

export default runJava;