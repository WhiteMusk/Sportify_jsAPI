import React from "react";
// import SimpleReactFooter from "simple-react-footer";
import SimpleReactFooter from './SimpleReactFooter';
function Footer()
{
    const description = "Sportify is a website designed for sports event registration, aggregation, and supports online payment service as well as event progress tracking. The origin of Sportify is a simple idea to have more sport events to join. Now, we implement the idea through sportify and we kindly invite you to join us. With your participating, sport events will be more fun. Click a event card and start your journey here!";
  const title = "Sportify";
  const columns = [
    {
        title: "Resources",
        resources: [
            {
                name: "About",
                link: "/about"
            },
            {
                name: "Contact",
                link: "/contact"
            },
        ]
    },
    {
        title: "Legal",
        resources: [
            {
                name: "Privacy",
                link: "/privacy"
            },
            {
                name: "Terms",
                link: "/terms"
            }
        ]
    },
    {
        title: "Visit",
        resources: [
            {
                name: "Locations",
                link: "/locations"
            },
            {
                name: "Culture",
                link: "/culture"
            }
        ]
    }
 ];
 return (
 <SimpleReactFooter 
    description={description} 
    title={title}
    columns={columns}
    linkedin="yi-hong-lin-040889138"
    facebook="fluffy_cat_on_fb"
    twitter="fluffy_cat_on_twitter"
    instagram="fluffy_cat_live"
    youtube="UCFt6TSF464J8K82xeA?"
    pinterest="fluffy_cats_collections"
    copyright="black"
    iconColor="black"
    backgroundColor="#fffff"
    fontColor="black"
    copyrightColor="darkgrey"
 />
 )
};
export default Footer;