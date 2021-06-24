import React, { Component } from 'react';
import { motion } from 'framer-motion';
import './Hero-container.css'

export default class Herocontainer extends Component {

    
     

    render(){
        const variants = {
            active:{
                backgroundColor: "rgb(255,255,255)"
            
            },
    
            inactive:{
                backgroundColor: "#000",
                transition: {duration: 2}
            }
        }

        return (
            <div className="div">
                <h1> sup </h1>
                <motion.div
                className="red"
  animate={{ x: 100 }}
  transition={{ ease: "easeOut", duration: 2 }}
/>
              
            </div>
        )
    }
}

