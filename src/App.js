import './App.css';
import {
  Pets
} from './ui-components'
import { NavBar } from "./ui-components";
import { Footer } from "./ui-components";
import PetProfile from './ui-components/PetProfile';
import { 
  AddPet,
  PetDetails 
} from "./ui-components";
import { useState } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react'
import { Storage } from '@aws-amplify/storage'

function App({user, signOut}) {

  async function saveFile() {
    await Storage.put( "test.txt", "Hello" )
  }

  const [showForm, setShowForm] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [pet, setPet] = useState()
  const [updatePet, setUpdatePet] = useState()

  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [breed, setBreed] = useState("")
  const [about, setAbout] = useState("")
  const [color, setColor] = useState("")
  const [image, setImage] = useState("")
  const [fileData, setFileData] = useState()
  const [fileKey, setFileKey] = useState()

  const uploadFile = async () => {
    console.log('fileData', fileData)
    const {key} = await Storage.put(fileData.name, fileData, {contentType: fileData.type} )
    setFileKey(key)
    console.log('fileKey', fileKey)
    AddPet.TextField31712683.value = fileKey
    await AddPet.buttonTwoNineSevenSixSixNineTwoSixOnClick()
  }

  const formOverrides = {
    TextField29766922: {
      placeholder: name
    },
    TextField29766923: {
      placeholder: age
    },
    TextField29766924: {
      placeholder: breed
    },
    TextField31712669: {
      placeholder: about
    },
    TextField31712676: {
      placeholder: color
    },
    TextField31712683: {
      placeholder: image,
      value: fileKey
    },
    image: {
      src: updatePet == null ? 
        "https://cdn4.vectorstock.com/i/1000x1000/62/93/dog-cat-pet-logo-icon-negative-space-style-vector-25836293.jpg" :
        updatePet.image
    },
    Button31712691: {
      isDisabled: !updatePet ? true : false
    },
    Button29766926: {
      isDisabled: updatePet ? true : false,
      onClick: (
        uploadFile()
      )
    },
    Icon: {
      style: {
        cursor: "pointer"
      },
      onClick: () => {
        setShowForm(false)
      }
    },
    TextField31892684: {
      type: "file",
      onChange: (
        e => setFileData(e.target.files[0])
      )
    }
  }
  const navbarOverride = {
    image: {
      // src: "https://e7.pngegg.com/pngimages/877/358/png-clipart-whiskers-cat-logo-brand-product-design-cat-angle-white.png"
      src: user?.attributes?.profile
    },
    "Add Pet": {
      style: {
        cursor: "pointer"
      },
      onClick: () => {
        saveFile()
        setShowForm(!showForm)
      }
    },
    Button: {
      onClick: signOut,
    },
    // "Welcome [Username]": {
    //   children: {
    //     label: user.name,
    //   }
    // }`
  }
  const detailsOverrides = {
    Close: {
      style: {
        cursor: "pointer"
      },
      onClick: () => {
        setShowDetails(false)
      }
    }
  }
  return (
    <div className="App">
      <NavBar width={"100%"} overrides={navbarOverride} />
      <header className="App-header">
        {showDetails && <PetDetails
          overrides={detailsOverrides}
          pet={pet}
          style={{
            textAlign: "left",
            margin: "1rem"
          }}
        />}
        {showForm && (
          <AddPet 
            pet={updatePet}
            overrides={formOverrides}
            style={{
              textAlign: "left",
              margin: "1rem"
            }}/>
        )}
        <Pets 
          overrideItems={({item, index}) => ({
            overrides: {
              Breed: {color: "blue"},
              Button29766907: {
                onClick: () => {
                  setShowDetails(!showDetails)
                  setPet(item)
                }
              },
              Button31632681: {
                onClick: () => {
                  if (!showForm) 
                    setShowForm(true)
                    setUpdatePet(item)
                    setName(item.name)
                    setAge(item.age)
                    setBreed(item.breed)
                    setAbout(item.about)
                    setColor(item.color)
                    setImage(item.image)
                }
              }
            }
          })}
        />
        <Footer width={"100%"} />
      </header>
    </div>
  );
}

export default withAuthenticator(App);
