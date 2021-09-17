export default function loadIpfsImgs(type: string, data: any[], fn: (params: []) => void) {
  let list:any = new Array(data.length).fill('');
  data.forEach((item, index) => {
    let img = new Image();
    img.src = item[type]
    img.onload = () => {
      list[index] = img;
      let totalLength = 0;
      for(let content of list){
        if(content){ totalLength += 1; }
      }
      if(totalLength === list.length){
        fn(list)
      }
    }
  })
}