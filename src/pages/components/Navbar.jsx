import { useEffect, useState } from "react"
import { Home, LogOut, MessageSquare, Settings } from "react-feather"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"


export default function Navbar() {
    const { profileId } = useParams()
    const [displayPopupMenu, setDisplayPopupMenu] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        setDisplayPopupMenu(false)
    }, [location])

    function handleLogout() {
        localStorage.removeItem('socmedtoken')
        navigate('/login')
    }

    function handleDisplayPopupMenu() {
        setDisplayPopupMenu(!displayPopupMenu)
    }

    function handleSettingsClick() {
        navigate(`/profile/${profileId}/settings`)
    }

    return (
        <>
            <div className="grid grid-cols-5">
                <Link to={`/profile/${profileId}/feed`} className="col-span-1">
                    <h1 className="text-4xl font-bold text-astronautWhite">Social Media</h1>
                </Link>
                <div className="col-span-3 grid grid-cols-2 justify-center">
                    <Link to={`/profile/${profileId}/feed`} className="flex justify-center"><Home className="stroke-astronautWhite"/></Link>
                    <button disabled={true} className="flex justify-center"><MessageSquare className=" stroke-metallicGray" /></button>
                    {/* add coming soon */}
                </div>
                <div className="col-span-1 flex justify-end relative">
                    <button
                        onClick={handleDisplayPopupMenu}
                        className="h-8 w-8 rounded-full bg-rocketRed absolute"></button>
                    {displayPopupMenu &&
                        <div className="absolute w-64 top-10 border-metallicGray border-2 rounded-md p-4 grid gap-2 bg-deepSpaceBlack">
                            <div>
                                <button className="flex justify-self-end text-astronautWhite gap-2" onClick={handleSettingsClick}><Settings size={18}/>Settings</button>
                            </div>
                            <div >
                                <button className="flex justify-self-end text-astronautWhite gap-2" onClick={handleLogout}><LogOut size={18}/> logout</button>
                            </div>
                        </div>
                    }
                </div>
            </div>


        </>
    )
}
