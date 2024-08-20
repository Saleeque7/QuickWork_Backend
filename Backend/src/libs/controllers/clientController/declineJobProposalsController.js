export default (dependencies) => {
    const declineJobProposalsController = async(req,res)=> {
        const {use_case : {declineJobProposalsUsecase}} =dependencies
        try {
          const proposalId = req.query.id
          const {execute} = await declineJobProposalsUsecase(dependencies)
          const result = await execute(proposalId)

          if(!result){
            return res.status(401).json({message:"error in unshortListJobProposalsController"})
          }

          return res.status(200).json({proposals:result})
        } catch (error) {
            console.error("error in declineJobProposalsController" , error);
        }
    }
    return declineJobProposalsController
}