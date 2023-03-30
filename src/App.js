import { useState } from "react";

function App() {
  let [newArticle, setNewArticle] = useState()
  let [newPrice, setNewPrice] = useState()
  let [articles, setArticles] = useState([])
  let [newId, setNewId] = useState(0)
  let [sum, setSum] = useState(0)
  let [add, setAdd] = useState(false)

  return (
    <div>
      <div className="my-4"></div>
      <div className="flex flex-row justify-center">
        <h1 className="text-xl">Simple POS System </h1>
        <button className="text-xl bg-black text-white rounded px-2 mx-2" onClick={()=> {setAdd(!add)}}>⚙</button>

      </div>
      <div className="flex flex-row justify-center" >
        {"Sum: "+ sum + " €"}
      </div>
      {add ? <div className="my-4">
          <input className="border mx-2  border-black" type={"text"} onInput={(e)=> setNewArticle(e.currentTarget.value)} placeholder="Article"></input>
          <input className="border mx-2  border-black" type={"number"} onInput={(e)=> setNewPrice(e.currentTarget.value)} placeholder="Price"></input>
          <button className="text-xl bg-white rounded mx-2" onClick={()=> {setNewId(newId+1); setArticles([...articles, { id: newId, article: newArticle, price: newPrice, count: 0}])}}>+</button>
        </div>
        :<></>
      }

      <div className="my-4">
        {articles.map((entry) => (
          <div className="flex flex-row justify-center m-2 " >
            {add ? <button className="text-white bg-black rounded-md px-2" onClick={()=> setArticles(articles.filter((element) => entry.id !== element.id))}>🗑</button>: <></>}
            <div className="mx-1 w-1/5">{entry.price + " €"}</div>
            <div className="mx-1 w-1/2">{entry.article}</div>
            <div className="mx-1 w-6">{entry.count}</div>
            <button className="text-white bg-black rounded-md px-2 mx-1" onClick={()=> {
              let data = [...articles];
              let index = data.findIndex(article => article.id === entry.id);
              data[index] = {
                  ...data[index],
                  count: data[index].count > 0 ? data[index].count -1 : 0,
              };
              setArticles(data);
              setSum(data.reduce((a,b)=> a+ b.count*b.price, 0))
            }}>-</button>
            <button className="text-white bg-black rounded-md px-2" onClick={()=> {
              let data = [...articles];
              let index = data.findIndex(article => article.id === entry.id);
              data[index] = {
                  ...data[index],
                  count: data[index].count +1,
              };
              setArticles(data);
              setSum(data.reduce((a,b)=> a+ b.count*b.price, 0))
            }}>+</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
