import { exec } from "child_process";

export const startArma3Server = async () => {
  const { stdout, stderr } = await exec(
    "arma3server.exe -config=server.cfg -profiles=profiles -name=MyServer -port=2302 -password=MyPassword -mod=@MyMod"
  );
  console.log("stdout:", stdout);
  console.log("stderr:", stderr);
};
