import { useNavigate } from "react-router-dom"
import { useStore } from "../../../Zustand/store"
import "./HomeVideo.css"

// type Props = {
//     video: any,
//     liked: string
// }

export default function HomeVideo({video, liked, videoLiked, videoSaved, user, videoMine }:any) {

    const navigate = useNavigate()

    function handleRedirectToUser(userId:any) {
        navigate(`/users/${userId}`)
    }

    const { setVideos } = useStore()
    
    function increaseView() {
    
        fetch(`http://localhost:4000/videosViews/${video.id}`, {
    
            method: "PATCH",
    
            headers: {
                "Content-Type": "application/json"
            },
    
            body: JSON.stringify({ views: video.views + 1 }),
        })
            .then((resp) => resp.json())
            .then((data) => {
    
            if (data.error) {
                alert(data.error);
            } 
            
            else {
                setVideos(data);
            }
    
        });
                
    }

    return (

        <>

            { liked === "not" && videoLiked === null && videoSaved === null && videoMine === null && video ? (

                <>  

                    <div className="main-post" onClick={function () {
                        increaseView()
                        navigate(`/videos/${video?.id}`)               
                    }}>

                        <img className="image-post" src={`http://localhost:4000/thumbnail/${video?.title}`} alt="" />
                        <img className="icon-post" src={`http://localhost:4000/avatar/${video?.userWhoCreatedIt?.userName}`} alt="" />
                        
                        <h2 className="video-title">{video?.title}</h2>
                        
                        <span className="video-user" onClick={function () {
                            handleRedirectToUser(video?.userWhoCreatedIt?.id)
                        }}>{video?.userWhoCreatedIt?.userName}</span>
                        
                        <span className="video-views">{video?.views} views - {video?.createdAt} </span>
                    
                    </div>
                
                </>

            ): liked === "liked" && videoLiked && videoSaved === null && videoMine === null && video === null ? (

                <>  

                    <div className="main-post" onClick={function () {
                        increaseView()
                        // console.log(videoLiked)
                        navigate(`/videos/${videoLiked?.videoId}`)               
                    }}>

                        <img className="image-post" src={`http://localhost:4000/thumbnail/${videoLiked?.video?.title}`} alt="" />                        
                        <h2 className="video-title">{videoLiked?.video?.title}</h2>
                        <span className="video-views">{videoLiked?.video?.views} views - {videoLiked?.video?.createdAt} </span>
                    
                    </div>
                
                </>

            ): liked === "not" && videoLiked === null && videoSaved && videoMine === null && video === null ? (
                
                <>  

                    <div className="main-post" onClick={function () {
                        increaseView()
                        navigate(`/videos/${videoSaved?.videoId}`)               
                    }}>

                        <img className="image-post" src={`http://localhost:4000/thumbnail/${videoSaved?.title}`} alt="" />
                        <img className="icon-post" src={`http://localhost:4000/avatar/${user?.userName}`} alt="" />
                        
                        <h2 className="video-title">{videoSaved?.title}</h2>
                        
                        <span className="video-user" onClick={function () {
                            handleRedirectToUser(user?.id)
                        }}>{user?.userName}</span>
                        
                        <span className="video-views">{videoSaved?.views} views - {videoSaved?.createdAt} </span>
                    
                    </div>
                
                </>

            ): liked === "not" && videoLiked === null && videoSaved === null && videoMine && video === null ? (
                
                <>  

                    <div className="main-post" onClick={function () {
                        increaseView()
                        navigate(`/videos/${videoMine?.videoId}`)               
                    }}>

                        <img className="image-post" src={`http://localhost:4000/thumbnail/${videoMine?.title}`} alt="" />
                        <img className="icon-post" src={`http://localhost:4000/avatar/${user?.userName}`} alt="" />
                        
                        <h2 className="video-title">{videoMine?.title}</h2>
                        
                        <span className="video-user" onClick={function () {
                            handleRedirectToUser(user?.id)
                        }}>{user?.userName} </span>
                        
                        <span className="video-views">{videoMine?.views} views - {videoMine?.createdAt} </span>
                    
                    </div>
                
                </>

            ): null}

        </>

    )
    
}