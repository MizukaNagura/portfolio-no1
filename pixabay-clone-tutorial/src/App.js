import { useRef, useState } from "react";
import './App.css';
import ImageGallery from "./ImageGallery";

function App() {
  //dataを格納するための箱を用意
  //APIをたたくたびにsetFetchDataが呼ばれ、その時だけレンダリングする
  //fetchDataを使って関連する画像を全て出力
  const [fetchData, setFetchData] = useState([]);
  //inputで受け取った値を文字列として取得
  const ref = useRef();

  const handleSubmit = (e) => {
    //enterキー押した後のリロードを防ぐ
    e.preventDefault();
    console.log(ref.current.value);

    //APIURL
    //テンプレートリテラル
    const endpointURL = `https://pixabay.com/api/?key=30098022-f1c5ff4aabc4efb61977f2b66&q=${ref.current.value}&image_type=photo`;
    //APIを叩く(データフェッチング)非同期処理   
    fetch(endpointURL).then((res) => {
      //json形式に変換
      return res.json();
    })
    //json形式にしたものをdataに格納
    .then((data) => {
      console.log(data.hits);
      setFetchData(data.hits);
    });
  };
  
  
  // enterキー押した後に文字列取得
 //プロップスの受け渡し（コンポーネント間で変数の受け渡し）
  return (
    <div className="container">
      <h2>My Pixabay</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" placeholder="画像を探す" ref={ref} />
      </form>
      <ImageGallery fetchData={fetchData} />
    </div>
  );
}

export default App;
