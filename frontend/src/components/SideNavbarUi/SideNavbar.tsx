import AppLogo from "../icons/AppLogo";
import NavFields from "./NavFields";
//import ShareIcon from "../icons/ShareIcon";
//import TwitterIcon from "../icons/TwitterIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
//import NotionIcon from "../icons/NotionIcon";
//import InstagramIcon from "../icons/InstagramIcon";
import DocumentIcon from "../icons/DocumentIcon";
import All from "../icons/All";

interface SideNavbarProps {
    data1?: any;
    setData?: any;
    setYTData?: any;
    setNotionData?: any;
    setDataShow?: any;
}

const SideNavbar = (props: SideNavbarProps) => {

    function yt(){
        const ytData = props.data1.filter((item: any) => item.contentType === "Youtube");
        props.setYTData(ytData);
        props.setDataShow("Youtube");
    }

    function nt(){
        const ntData = props.data1.filter((item: any) => item.contentType === "Notion" || item.contentType === "Twitter");
        props.setNotionData(ntData);
        props.setDataShow("Notion");
    }

    function all(){
        props.setDataShow("All");
    }

    return (
        <div>
            <div className="w-[20vw] h-screen border-r-2 inline-block">
                <div className="flex gap-2 ml-3 pt-3">
                    <AppLogo /> <span className="text-[27px] font-bold">Second Brain</span>
                </div>
                <div onClick={all}><NavFields text={"All"} startIcon={<All/>} /></div>
                <div onClick={yt}><NavFields text={"Youtube"} startIcon={<YoutubeIcon/>} /></div>
                <div onClick={nt}><NavFields text={"Documents"} startIcon={<DocumentIcon/>} /></div>
            </div>
        </div>
    )

}

export default SideNavbar;