import { useParams } from "react-router-dom"
import SubHeader from "../components/Sub/SubHeader";
import MainSub from "../components/Sub/MainSub";
import SubRightBar from "../components/Sub/SubRightBar";

function Sub() {

    const {subName} = useParams();

    return (
        <div className="w-full h-full">
            <div className="w-full h-[175px]">
                <SubHeader />
            </div>
            <div className="flex gap-2 w-full justify-between p-4">
                    <MainSub />
                    <SubRightBar />
            </div>
        </div>
    )
}

export default Sub