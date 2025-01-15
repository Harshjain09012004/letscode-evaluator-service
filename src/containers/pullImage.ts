import Docker from "dockerode";

async function pullImage(imageName : string){
    try{
        const docker = new Docker();
        return new Promise((res, rej)=>{
            docker.pull(imageName, (err : Error, stream : NodeJS.ReadableStream)=>{
                if(err) throw err;
                docker.modem.followProgress(stream, (err, response)=> err ? rej(err) : res(response));
            });
        });
    } catch(err){
        console.log(err);
    }
}

export default pullImage;