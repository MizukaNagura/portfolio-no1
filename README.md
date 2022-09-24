# portfolio-no1

webAPIをたたいて必要な値を持ってくる流れの学習

大元は、App.js
画像の受け取りは、ImageGallery.js

App.js

function App() {
  //dataを格納するための箱を用意
  //APIをたたくたびにsetFetchDataが呼ばれ、その時だけレンダリングする
  //fetchDataを使って関連する画像を全て出力
 　const [fetchData, setFetchData] = useState([]);
  //inputで受け取った値を文字列として取得
   2️⃣const ref = useRef();

  3️⃣const handleSubmit = (e) => {
    //enterキー押した後のリロードを防ぐ
    e.preventDefault();
    //入力した文字列の値が入ってる
    console.log(ref.current.value);

    //APIURL
    //テンプレートリテラル
   　4️⃣const endpointURL = `https://pixabay.com/api/?key=30098022-f1c5ff4aabc4efb61977f2b66&q=${ref.current.value}&image_type=photo`;
    //APIを叩く(データフェッチング)非同期処理
   　5️⃣fetch(endpointURL).then((res) => {
      //Promise型をjson形式に変換
      return res.json();
    })
    //json形式にしたものをdataに格納
    6️⃣.then((data) => {
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
        1️⃣<input type="text" placeholder="画像を探す" ref={ref} />
      </form>
      <ImageGallery fetchData={fetchData} />
    </div>
  );
}

export default App;




ImageGallery.js
//fetchDataのデータを受け取り、map関数で展開
const ImageGallery = ({ fetchData }) => {
  return (
    <div>
      <div className="images-wrapper">
          {fetchData.map((data) => (
          <div className="image" key={data.id}>
            <a href={data.pageURL} target="_blank">  
              <img src={data.largeImageURL} alt="" /> 
            </a>
          </div>
          ))} 
      </div>
    </div>
  )
}

export default ImageGallery

