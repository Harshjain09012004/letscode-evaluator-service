import Docker from "dockerode";

async function createContainer(imageName: string, cmdExecutable: string[]){
    const docker = new Docker();

    const container = await docker.createContainer({
        Image : imageName,
        Cmd : cmdExecutable,
        AttachStderr : true,
        AttachStdin : true,
        AttachStdout : true,
        Tty : false,
        OpenStdin : true,
        HostConfig : {
            //Handles Memory Limit Exceeded
            Memory : 1024*1024*1024 //1 GB
        }
    });

    return container;
}

export default createContainer;