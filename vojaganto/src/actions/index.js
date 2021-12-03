
/**
* Handle setState when an input event occurs. 
* @param {React.Component} component 
* @param {Event} event 
*/
export function handleInputChange(component, event) {
    // From course demo
    const target = event.target;
    const value = target.value;
    const name = target.name;

    component.setState({ [name]: value });

    // console.log("handleInputChange", {[name]: value})
}


export function reloadPage() {
    window.location.reload(false);
}

export function redirectToPage(route = "/", newTab) {
    if (newTab){
        window.open(route, '_blank')
    } else {
        document.location.href = route
    }
}
