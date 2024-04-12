import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import { Navbar } from "../../components/navbar/Navbar";

const Home = () => {
	return (
		<>
		<Navbar/>
		<div className='flex  rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<Sidebar />
			<MessageContainer />
		</div>
		</>
		
	);
};
export default Home;
