
export const validateRequired = (value) =>{
	value = value ? value.toString() : "";
	if (!value || (typeof value.trim === 'function' && value.trim() === '') || (Array.isArray(value) && !value.length))
		return true;
	return false;
}

// export const validateEndDateGreaterRequired = (message:string)=> (value:string,allValues: any) => {
// 	if(value !== "" && value <= allValues.StartDate)
// 		return message;
// }
// export const validateValidJSONText = (message:string)=> (value:string,allValues: any) => {
// 	if(!(IsJsonString(value)))
// 		return message;
// }

// function IsJsonString(str:string) {
//     try {
//         JSON.parse(str);
//     } catch (e) {
//         return false;
//     }
//     return true;
// }


// export const validateEndDateGreaterOrEqualRequired = (message:string)=> (value:string,allValues: any) => {
// 	if(value !== "" && value < allValues.StartDate)
// 		return message;
// }

// export const validateRequiredNumeric = (value:any,message:string) =>{
// 	if(value === "")
// 		return message;
// }

// export const validateSelectRequired = (message:string)=>(value:any) =>{
// 	value = value ? value.toString() : "";
// 	if (value === '-1') 
// 		return message;
// }

// export const validateSelectICCIDRequired = (message:string)=>(value:any) =>{
// 	value = value ? value.toString() : "-1";
// 	if (value === '-1') 
// 		return message;
// }

// export const validateUserIdRequired = (message:string)=>(value:any) =>{
// 	value = value ? value.toString() : "";
// 	if (value === '-1' || value === "") 
// 		return message;
// }
// export const validateAlphaNumeric = (value:string) =>
// 	value && /[^a-zA-Z0-9 ]/i.test(value) ? 'Test' : undefined;

// export const validateEmail = (message:string)=>(value:string) =>{
// 	if(value !== ""){
// 		var re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([一-龠ぁ-ゔァ-ヴー々〆〤a-zA-Z\-0-9]+\.)+[一-龠ぁ-ゔァ-ヴー々〆〤a-zA-Z]{2,}))$/;
// 		if (!re.test(String(value).toLowerCase())) {
// 			return message;
// 		}
// 	}
// }
// export const validateMinLength = (limit:number,message:string)=>(value:string) =>{
// 	if(value && value!== '' && value.length<limit)
// 		return message;
// }
// export const validateMaxLength = (limit:number,message:string)=>(value:string) =>{
// 	if(value && value!== '' && value.length>limit)
// 		return message;
// }

// export const validateFirstCharacterWithLength = (limit:number,message:string)=>(value:string) =>{
// 	if(value && value!== '' && value.length === limit && value[0] !== 'S')
// 		return message;
// }
export const validateConfirmPassword = (value, passValues) => {
	// debugger
	if(value != "" && value!= passValues)
		return true;
	return false;
}

// export const validatePassword = (value:string) =>{
// 	if(value !== ""){
// 		var re = /[^一-龠ぁ-ゔァ-ヴー々〆〤A-Za-z0-9!#$-%&()*+/:;<>@?_|¥^[\]]/;
// 		if (re.test(value)) {
// 			return "Password is invalid.";
// 		}
// 	}
// }

// export const validateSpecialCharacter = (message:string) => (value:string) =>{
// 	if(value !== "" && /[~`"']/i.test(value)){
// 		return message;
// 	}
// }



// export const validateNumberRange = (min:number,max:number,message:string)=>(value:string) =>{
// 	if(!value )
// 		return message;
// 	if(Number(value) < min || Number(value) > max)
// 		return message;
// }

// export const validateMinValue = (limit:number,message:string)=>(value:string) =>{
// 	if(value && value !== '' && parseInt(value) < limit)
// 		return message;
// }
