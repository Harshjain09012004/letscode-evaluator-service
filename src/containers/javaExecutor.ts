import CodeExecutorStrategy from "../types/codeExecutorStrategy";
import DockerStreamOutput from "../types/dockerStreamOutput";
import { JAVA_IMAGE } from "../utils/constants";
import createContainer from "./containerFactory";
import { bindLoggerToContainer} from "./dockerHelper";
import pullImage from "./pullImage";

class JavaExecutor implements CodeExecutorStrategy{
    async execute(code : string, inputData : string, outputData : string) : Promise<DockerStreamOutput>{
        const rawLogBuffer : Buffer[] = [];

        console.log("Initialising a new Java Container");
        console.log(outputData);
        
        //Pull Image if don't exist in docker
        await pullImage(JAVA_IMAGE);

        // Code & InputData should be wrapped inside single quotes
        // To remove the confusion with single quotes we replace them with double quotes

        const runCommands = `echo '${code.replace(/'/g, `"`)}' > Main.java && javac Main.java && echo '${inputData.replace(/'/g, `"`)}' | java Main`;

        // Below statment allow us to pass inputData while executing the code
        // /bin/sh tells the OS to run the command as bash script rather a normal statement
        // As commands includes echo so it becomes a bash script
        const javaDockerContainer = await createContainer(JAVA_IMAGE,['/bin/sh', '-c', runCommands]);

        // For starting and booting the java container
        await javaDockerContainer.start();

        console.log("Started The Java Docker Container");

        const codeResponse = await bindLoggerToContainer(javaDockerContainer, rawLogBuffer);

        await javaDockerContainer.remove();
        
        return codeResponse;
    }
}

export default JavaExecutor;