import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
	return (
		<div className='border-r border-slate-300 p-4 flex flex-col'>
			<div className="z-40 sticky top-0">
				<SearchInput />
				<div className='divider px-3'></div>
			</div>

			<Conversations />
			<LogoutButton />
		</div>
	);
};
export default Sidebar;

