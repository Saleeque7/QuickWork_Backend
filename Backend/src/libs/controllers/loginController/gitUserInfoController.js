import { generateToken } from "../../utils/Jwt/generateToken.js";

export default (dependencies) => {
  const {
    use_case: { gitUserInfoUsecase },
  } = dependencies;
  const gitUserInfoController = async (req, res) => {
    try {
      const auth = req.get("Authorization");
      const { userType } = req.query;

      const { executeFunction } = gitUserInfoUsecase(dependencies);
      const result = await executeFunction(auth, userType);

      if (!result.success) {
        console.error(
          "login failed in gitUserInfoController :",
          result.message
        );
        res.status(400).json({ success: false, message: result.message });
        return;
      }
      const userRole = result.person.job_role === "freelancer" ? "user" : "client"
      const { accessToken, refreshToken } = await generateToken(res, result.person._id, userRole);
      return res
        .status(200)
        .json({
          success: true,
          user: result.person,
          accessToken: accessToken,
          refreshToken: refreshToken,
          message: "login successFull",
        });
    } catch (error) {
      console.error("Error in gitUserInfoController:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  return gitUserInfoController;
};
