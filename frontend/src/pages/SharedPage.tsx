import { useLocation, useParams } from "react-router-dom";
import Card from "../components/CardUi/Card";
import { useState, useEffect } from "react";

const SharedPage = () => {
    //@ts-ignore
    const { id } = useParams();
    const location = useLocation();
    const [shareData, setSharedata] = useState<any[]>([]);

    useEffect(() => {
        // first we will try to get data from location state (if  navigated within the app)
        if(location.state?.shared){
            setSharedata(location.state.shared);
        }else{
            // If no state, try to get from URL query params
            const queryParams = new URLSearchParams(location.search);
            const dataParams = queryParams.get("data");

            if(dataParams){
                try{
                    const decodedData = JSON.parse(decodeURIComponent(dataParams));
                    setSharedata(decodedData);
                }catch(err){
                    console.log("Something went wrong", err)
                }
            }
        }
    }, [location]);

    return(
        <div className="bg-slate-200 w-full min-h-screen">
            <div className="flex justify-between">
                <div className="font-bold text-3xl mt-4 ml-8">Shared Content By Second Brain...</div>
            </div>
            <div className="ml-7 mt-6 flex flex-wrap gap-x-3 gap-y-5">
                {shareData.length > 0 ? (
                    shareData.map((item: any, idx: number) => (
                        <Card
                            key={idx}
                            icon={item.contentType}
                            tag={item.tag}
                            title={item.title}
                            link={item.link}
                        />
                    ))
                ) : (
                    <div className="text-2xl font-semibold">No shared content found</div>
                )}
            </div>
        </div>
    );
};

export default SharedPage;