export const updateObject = (oldState:any, updatedProperties:any) => {
	return {
		...oldState,
		...updatedProperties
	};
}