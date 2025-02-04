import CodeExecutorStrategy from "../types/codeExecutorStrategy";
import DockerStreamOutput from "../types/dockerStreamOutput";
import { PYTHON_IMAGE, PYTHON_TIME_LIMIT } from "../utils/constants";
import createContainer from "./containerFactory";
import { bindLoggerToContainer } from "./dockerHelper";
import pullImage from "./pullImage";

class PythonExecutor implements CodeExecutorStrategy{
    async execute(code : string, inputData : string,  outputData : string) : Promise<DockerStreamOutput>{
        const rawLogBuffer : Buffer[] = [];

        console.log("Initialising a new Python Container");
        console.log(outputData);
        
        // Pull Image if don't exist in docker
        await pullImage(PYTHON_IMAGE);

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

        console.log("Started The Python Docker Container");

        const codeResponse = await bindLoggerToContainer(pythonDockerContainer, rawLogBuffer, PYTHON_TIME_LIMIT);

        await pythonDockerContainer.remove();

        return codeResponse;
    }
}

export default PythonExecutor;