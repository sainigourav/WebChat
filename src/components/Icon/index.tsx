import Icons from "../../assets/icons";

const allIcons:any = Icons;

const Icon = ({ id, ...props }:any) => {
	const selectedIcon = allIcons[id];
	return selectedIcon ? selectedIcon(props) : null;
};

export default Icon;
