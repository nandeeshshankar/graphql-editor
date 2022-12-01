import './App.css';
import React, { useState } from "react";
import { GraphQLEditor, PassedSchema, GraphQLGqlEditor } from "graphql-editor";

const schemas = {
  pizza: `
    type Query{
      pizzas: [Pizza!]
    }
    `,
  pizzaLibrary: `
    type Pizza{
      name:String
    }
    `,
  };

const obj: Record<string, string> = {
  pizza: `
    type Query{
      pizzas: [Pizza!]
    }
    `,
  burger: `
    type Query{
      Burger: [Pizza!]
    }
    `,
};

function App() {

  let fileReader:any;

  const fileRead = (e:any) => {
    const content = fileReader.result;
    console.log(content);
    setMySchema({
      code: content,
      libraries: "",
    });
    obj["Load"] = content;
    // console.log(obj);
  };

  const fileChosen = (file:any) => {
    fileReader = new FileReader();
    fileReader.onloadend = fileRead;
    fileReader.readAsText(file.target.files[0]);
  };

  // const [gql, setGql] = useState("");
  const [mySchema, setMySchema] = useState<PassedSchema>({
    code: schemas.pizza,
    libraries: schemas.pizzaLibrary,
  });

  const newGraph = () => {
    setMySchema({
      code: '',
      libraries: ''
    });
  };

  return (
    <>
      <div className="main">
        <div className="sideNav">
          <button className="button" onClick={() => newGraph()}>
            New
          </button>
          <br></br>
          <label htmlFor="file-input" className="label">
            Load
          </label>
          <input
            type="file"
            id="file-input"
            accept=".graphqls"
            onChange={(e) => fileChosen(e)}
          />
        </div>
        <div
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            alignSelf: "stretch",
            display: "flex",
            position: "relative",
          }}
          className="stDiv"
        >
          <GraphQLEditor
            setSchema={(props: any) => setMySchema(props)}
            schema={mySchema}
            diffSchemas={obj}
          />

          {/* <GraphQLGqlEditor
            gql={gql}
            setGql={(gqlString) => setGql(gqlString)}
            schema={{ code: mySchema.code }}
          /> */}
        </div>
      </div>
    </>
  );
}

export default App;
