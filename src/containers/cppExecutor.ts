import CodeExecutorStrategy from "../types/codeExecutorStrategy";
import DockerStreamOutput from "../types/dockerStreamOutput";
import { CPP_IMAGE } from "../utils/constants";
import createContainer from "./containerFactory";
import { bindLoggerToContainer } from "./dockerHelper";
import pullImage from "./pullImage";

class CppExecutor implements CodeExecutorStrategy{
    async execute(code :string, inputData : string) : Promise<DockerStreamOutput>{
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

        console.log("Started CPP The Docker Container");

        const codeResponse = await bindLoggerToContainer(cppDockerContainer, rawLogBuffer);

        await cppDockerContainer.remove();

        return codeResponse;
    }
}

export default CppExecutor;