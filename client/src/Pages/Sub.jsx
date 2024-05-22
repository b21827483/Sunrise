import SubHeader from "../components/Sub/SubHeader";
import MainSub from "../components/Sub/MainSub";
import SubRightBar from "../components/Sub/SubRightBar";
import CreatePost from "../components/Sub/CreatePost/CreatePost";

function Sub() {
    let openMainSub;

    let pathname = window.location.pathname;
    pathname = pathname.split('/').pop();
    if (pathname === 'submit') {
        openMainSub = false;
    } else {
        openMainSub = true;
    }

    return (
        <div className="w-full h-full">
            {openMainSub &&
            <div className="w-full h-[200px]">
                <SubHeader />
            </div>
            }
            <div className="flex gap-2 w-full justify-between p-4">
                {openMainSub ? <MainSub /> : <CreatePost />}
                <SubRightBar />
            </div>
        </div>
    )
}

export default Sub