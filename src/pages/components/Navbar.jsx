import { useState } from "react"
import { Settings } from "react-feather"
import { useNavigate, useParams } from "react-router-dom"


export default function Navbar() {
    const { profileId } = useParams()
    const [displayPopupMenu, setDisplayPopupMenu] = useState(false)
    const navigate = useNavigate()
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
                <div className="col-span-1">
                    <h1 className="text-4xl font-bold text-astronautWhite">Social Media</h1>
                </div>
                <div className="col-span-3">

                </div>
                <div className="col-span-1 flex justify-end relative">
                    <button
                        onClick={handleDisplayPopupMenu}
                        className="h-8 w-8 rounded-full bg-rocketRed absolute"></button>
                    {displayPopupMenu &&
                        <div className="absolute w-64 top-10 bg-metallicGray rounded-md p-4 grid">
                            <div>
                                <button className="flex justify-self-end text-astronautWhite gap-2" onClick={handleSettingsClick}><Settings />Settings</button>
                            </div>
                            <div >
                                <button className="flex justify-self-end text-astronautWhite" onClick={handleLogout}>logout</button>
                            </div>
                        </div>
                    }
                </div>
            </div>


        </>
    )
}
