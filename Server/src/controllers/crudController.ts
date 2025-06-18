import { AuthRequest } from "../middleware/authMiddleware";
import { Response } from "express";
import z, { string } from "zod";
import userContent from "../models/contentModel";

export const newContent = async(req: AuthRequest, res: Response) => {
    try{
        const requireBody = z.object({
            link: z.string().min(3).max(200).url(),
            contentType: string().min(3).max(200),
            title: string().min(1).max(20),
            tag: z.string().min(1).max(20)
        })

        const safeParseData = requireBody.safeParse(req.body);
        if(!safeParseData.success){
            res.status(400).json({
                message: "Invalid Form",
                error: safeParseData.error
            })
            return;
        }

        const { link, contentType, title, tag } = safeParseData.data;
        const userid = req.userID;

        const contentCreated = new userContent({
            link: link,
            contentType: contentType,
            title: title,
            tag: tag,
            userId: userid
        })

        await contentCreated.save();
        res.status(200).json({
            message: "Content created sucessfully"
        })
        return;

    }catch(err){
        console.log("Err(catch): something is wrong", err);
        return;
    }
}

export const content = async(req:AuthRequest, res: Response) => {
    try{
        const userid = req.userID;

        //checking whether the userid exists or not
        if(!userid){
            res.status(400).json({
                message: "Something went wrong"
            })
            return;
        }

        const userData = await userContent.find({
            userId: userid
        })

        if (userData.length === 0) {
            res.status(404).json({
                message: "No content found for this user"
            });
            return;
        }

        res.status(200).json({
            message: "User data fetched sucessfully",
            data: userData
        });

        //console.log(userData)
    }catch(err){
        console.log("Err(catch): Something went wrong", err);
        return;
    }
}

export const deleteContent = async(req: AuthRequest, res: Response) => {
    try{
        const userid = req.userID;
        const userTitle = req.params.contentId;

        //console.log("userid = ", userid);
        //console.log("contentid = ", userTitle);

        if(!userid || !userTitle){
            res.status(400).json({
                message: "Both the fields are mandatory"
            })
            return;
        }

        const content = await userContent.findOne({
            title: userTitle,
            userId: userid
        });

        if(!content){
            res.status(400).json({
                Message: "Content not found or unauthorized"
            })
            return;
        }

        await userContent.findByIdAndDelete(content._id);
        res.status(200).json({
            message: "Content sucessfully deleted"
        })
        return;

    }catch(err){
        console.log("Err(catch) : Something went wrong", err);
        return;
    }
}

export const shareContent = async(req: AuthRequest, res: Response) => {
    const { userId } = req.params;
    try{
        const documents = await userContent.find({ userId });
        res.status(200).json({
            data: documents
        });
        return;
        
    }catch(err){
        console.log("Err(catch): Something went wrong: ", err);
    }
}