import { PYTHON_IMAGE } from "../utils/constants";
import createContainer from "./containerFactory";
import decodeDockerStream from "./dockerHelper";

async function runPython(code : string, inputData : string){
    const rawLogBuffer : Buffer[] = [];

    console.log("Initialising a new Python Container");
    
    // Below code only allow us to run code not to pass any data
    // -c flag enable to run code from string
    // const pythonDockerContainer = await createContainer(PYTHON_IMAGE,['python3', '-c', code, 'stty -echo']);

    // Code & InputData should be wrapped inside single quotes
    // To remove the confusion with single quotes we replace them with double quotes
    const runCommands = `echo '${code.replace(/'/g, `"`)}' > test.py && echo '${inputData.replace(/'/g, `"`)}' | python3 test.py`;

    // Below statment allow us to pass inputData while executing the code
    // /bin/sh tells the OS to run the command as bash script rather a normal statement
    // As commands includes echo so it becomes a bash script
    const pythonDockerContainer = await createContainer(PYTHON_IMAGE,['/bin/sh', '-c', runCommands]);

    // For starting and booting the python container
    await pythonDockerContainer.start();

    console.log("Started The Docker Container");

    const loggerStream = await pythonDockerContainer.logs({
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

        await pythonDockerContainer.remove();
    });
    
    return pythonDockerContainer;
}

export default runPython;