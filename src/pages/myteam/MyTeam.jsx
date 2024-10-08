import useCurrentUser from "../../hooks/useCurrentUser";


const MyTeam = () => {
    const [currentUser, loading] = useCurrentUser();
    console.log(currentUser);
    if(loading) {
        return <div className="animate-spin h-12 w-12 border-4 rounded-full border-red-500"></div>
    }
    return (
        <div>
            <h1>This is My Team page...</h1>
            <h1>Members Limit: {currentUser.role}</h1>
        </div>
    );
};

export default MyTeam;