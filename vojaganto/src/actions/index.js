
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


export const formatDate = (date) => date ?  new Date(date).toISOString().split('T')[0] : ""

export const getAvatarUrl = (avatar) => (avatar && avatar.length > 0) ? avatar : "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fdam%2Fimageserve%2F1171238184%2F960x0.jpg%3Ffit%3Dscale"

export const getImageUrl = (image) => (image && image.length > 0) ? image : "https://merriam-webster.com/assets/mw/images/article/art-wap-article-main/gray-background-7131-98db5e6ffc4972baa4087760291cbc3e@1x.jpg"
