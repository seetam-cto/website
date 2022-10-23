let initialState = {
    general: {
        colours: {
            primary: "#FF5A5F",
            secondary: "#484848",
            text: "#989898"
        },
        social: {
            facebook: "",
            instagram: "",
            twitter: "",
            youtube: "",
            koo: "",
            linkedIn: "",
            tripadvisor: ""
        },
        contact: {
            email: "contact@switchoff.in",
            phone: "+91 9999 999 999"
        },
        logo: "https://switchoff-assets.fra1.digitaloceanspaces.com/3525f420-6d66-4a38-bdc9-e4b1737d5f06.png",
        menu: [
            {
                title: "Home",
                url: "/"
            },
            {
                title: "Blogs",
                url: "/blogs"
            }
        ]
    },
    homepage: {
        deals: {
            title: "LIT Deals",
            subTitle: "Exciting deals just for you",
            list: [
                "634da8ed5a24b8a16fcfb076"
            ],
            enabled: true
        },
        locations: {
            title: "In Your Location",
            subTitle: "Find the best properties in your area",
            enabled: true
        },
        advanceBooking: {
            title: "Book your holidays in advance",
            subTitle: "Travel Vouchers for a stress free vacation",
            image: "https://switchoff-assets.fra1.digitaloceanspaces.com/e433afbb-8ca9-4f0b-b5ea-de1ccd963c14.jpg",
            list: [
                {
                    icon: "https://switchoff-assets.fra1.digitaloceanspaces.com/b2560c42-1923-483e-ae74-e71afa1a9260.png",
                    title: "Find your Dates",
                    subTitle: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut"
                },
                {
                    icon: "https://switchoff-assets.fra1.digitaloceanspaces.com/33129f2f-49a3-45a5-b6a5-f4fa3d5053db.png",
                    title: "Buy a Voucher",
                    subTitle: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut"
                },
                {
                    icon: "https://switchoff-assets.fra1.digitaloceanspaces.com/7e74fbd6-699c-4b0d-9a1d-68500b0dc207.png",
                    title: "Book Hassle-free",
                    subTitle: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut"
                }
            ],
            link: "/",
            enabled: true
        },
        experiences: {
            list: []
        },
        questions: {
            enabled: true
        }
    },
    footer: {
        quickLinks: [
            {
                link: "/",
                text: "Footer Link"
            },
            {
                link: "/",
                text: "Footer Link"
            }
        ]
    },
    "_id": "635136620cca2ef10546bd8a",
    loaded: false
}

export const settingsReducer = (state = {...initialState}, action) => {
    switch(action.type){
        case "FETCH_API":
            return {...state, ...action.payload};
        default:
            return state;
    }
}