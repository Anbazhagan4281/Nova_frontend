import { IconBrandOffice } from "@tabler/icons-react";
const Home = () => {
	return <div className="bg-[url('./public/assets/bg.jpg')] bg-current p-3 h-1/5">
		<div className="flex items-center">
			<div className="p-3 border rounded-md bg-white">
				<IconBrandOffice stroke={1} color="gray"></IconBrandOffice>
			</div>
			<div className="px-2">
				<div>Hello, {localStorage.getItem('username')}</div>
				<div className="text-xs">Demo</div>
			</div>
		</div>
		
	</div>;
};

export default Home;
