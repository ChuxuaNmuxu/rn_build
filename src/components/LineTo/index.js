import React, { Component } from 'react';

import {
  ScrollView,
  StyleSheet,
  ART,
} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const path = new ART.Path();
    path.moveTo(10, 10);
    path.lineTo(20, 10);
    path.reset(); // Reset the current path. Just like beginPath in canvasRenderingContext2d.
    path.moveTo(50, 50);
    path.lineTo(50, 100);
    path.lineTo(100, 100);
    path.close();

    return (
      <ScrollView style={styles.container}>
        <ART.Surface width={400} height={200} visible={false} style={{ backgroundColor: '#000' }}>
          {/* 第一组 Shape 线段 moveTo lineTo */}
          <ART.Group x={10} y={10}>
            <ART.Shape
              stroke="#ff0000" // 描边的颜色
              strokeWidth={5} // 描边的宽度
              fill="#0000ff" // 填充的颜色
                            // strokeDash={[10, 10, 20, 20, 30, 30]} // 长度 line-gap-line-gap-... repeat
              strokeCap="round" // cap style of path end.  oneOf(["butt", "round"(default), "square"])
              strokeJoin="bevel" // path join point style.  oneOf(["miter", "round"(default), "bevel"])
              d={
                new ART.Path().moveTo(0, 0).lineTo(40, 0)

                  .moveTo(-10, -10)
                  .lineTo(100, 188)
                  .close()}
            />
          </ART.Group>

        </ART.Surface>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

});


// {/* 第二组 Text 文字 */}
// <ART.Group x={100} y={10}>
// <ART.Text
//       strokeWidth={5} // 描边宽度
//       stroke="#00ff00" // 描边颜色
//       fill="#000000" // 文字颜色
//       alignment="center"
//       font={{
//           fontFamily: 'Helvetica, Neue Helvetica, Arial',
//           fontSize: 23,
//           fontWeight: 'bold',
//           fontStyle: 'italic',
//         }}
//     >zdy
//     </ART.Text>
// </ART.Group>
// {/* 第三组 Shape 画圆 arcTo */}
// <ART.Group x={0} y={100}>
// <ART.Shape
//       stroke="#ff0000" // 描边的颜色
//       strokeWidth={2} // 描边的宽度
//       d={new ART.Path().moveTo(50, 50).arcTo(150, 50, 50).arcTo(50, 50, 50)}
//     />
// </ART.Group>
// {/* 第四组 Shape 顺时针弧线 画扇形 arcTo */}
// <ART.Group x={0} y={200}>
// <ART.Shape
//       stroke="#ff0000" // 描边的颜色
//       strokeWidth={2} // 描边的宽度
//       fill="#00ff00"
//       d={new ART.Path().moveTo(50, 50).lineTo(50, 0).arcTo(100, 50, 50)
//           .lineTo(50, 50)}
//     />
// </ART.Group>
// {/* 第五组 Shape 逆时针弧线 counterArcTo */}
// <ART.Group x={100} y={200}>
// <ART.Shape
//       stroke="#ff0000" // 描边的颜色
//       strokeWidth={2} // 描边的宽度
//       fill="#00ff00"
//       d={new ART.Path().moveTo(50, 50).lineTo(50, 0).counterArcTo(100, 50, 50)
//           .lineTo(50, 50)}
//     />
// </ART.Group>
// {/* 第六组 Shape 曲线 curve */}
// <ART.Group x={0} y={300}>
// <ART.Shape
//       stroke="#ff0000" // 描边的颜色
//       strokeWidth={2} // 描边的宽度
//       fill="#00ff00"
//                 // If now we are at (10, 10), it draw a cubic bezier curve from (10, 10) to (22, 42) and use (10, 20) as first control point and (30, 40) the second one
//       d={new ART.Path().moveTo(10, 10).curve(10, 20, 30, 40, 12, 32)}
//     />
// </ART.Group>
// {/* 第七组 Shape 曲线 curveTo */}
// <ART.Group x={100} y={300}>
// <ART.Shape
//       stroke="#ff0000" // 描边的颜色
//       strokeWidth={2} // 描边的宽度
//       fill="#00ff00"
//                 // if now we are at (10, 10), it draw a cubic bezier curve from (10, 10) to (12, 32) and use (10, 20) as first control point and (30, 40) the second one
//       d={new ART.Path().moveTo(10, 10).curveTo(10, 20, 30, 40, 12, 32)}
//     />
// </ART.Group>
// {/* 第八组 Shape reset */}
// <ART.Group x={200} y={300}>
// <ART.Shape
//       stroke="#ff0000" // 描边的颜色
//       strokeWidth={2} // 描边的宽度
//       fill="#00ff00"
//       d={path}
//     />
// </ART.Group>
// {/* 第九组 Shape reset */}
// <ART.Group x={0} y={400}>
// <ART.Shape
//       stroke="#ff0000" // 描边的颜色
//       strokeWidth={2} // 描边的宽度
//       d={new ART.Path().moveTo(100, 0).lineTo(300, 0).lineTo(300, 100)
//           .lineTo(100, 100)
//           .close()}
//       fill={
//                     new ART.LinearGradient({
//                       0: '#2ba',
//                       '.5': '#f90',
//                       0.7: '#aa4422',
//                       1: 'rgba(255,255,255,0.5)',
//                     }, 100, 50, 300, 50)
//                 }
//     />
// </ART.Group>
// {/* 第十组 Shape reset */}
// <ART.Group x={0} y={500}>
// <ART.Shape
//       stroke="#ff0000" // 描边的颜色
//       strokeWidth={2} // 描边的宽度
//                 // d={new ART.Path().moveTo(100, 50).arcTo(200, 50, 50).arcTo(100, 50, 50)}
//       d={new ART.Path().moveTo(100, 0).lineTo(300, 0).lineTo(300, 100)
//           .lineTo(100, 100)
//           .close()}
//       fill={
//                     new ART.RadialGradient({
//                       0: '#2ba',
//                       1: '#f90',
//                     }, 300, 200, 400, 400, 200, 200)
//                 }
//     />
// </ART.Group>
// {/* 第十一组 Shape Pattern 失败了 */}
// {/* <ART.Group x={0} y={600} >
//             <ART.Shape
//                 stroke="#ff0000" // 描边的颜色
//                 strokeWidth={2} // 描边的宽度
//                 // d={new ART.Path().moveTo(100, 50).arcTo(200, 50, 50).arcTo(100, 50, 50)}
//                 d={new ART.Path().moveTo(100, 0).lineTo(300, 0).lineTo(300, 100).lineTo(100, 100).close()}
//                 transform={new ART.Transform().scaleTo(0.5, 0.5).move(50, 0).rotate(90, 100, 0).transform(2, 0, 1, 1, 0, 0)}
//             />
//         </ART.Group> */}
// {/* 第十二组 Shape ClippingRectangle */}
// <ART.Group x={0} y={1000}>
// <ART.ClippingRectangle
//       width={20} // 宽度
//       height={20} // 高度
//       x={0} // 横向起始点
//       y={0}
//     >
//       <ART.Shape d={new ART.Path().moveTo(0, 0).lineTo(200, 200)} stroke="black" strokeWidth={10} />
//     </ART.ClippingRectangle>
// <ART.ClippingRectangle
//       width={20}
//       height={20}
//       x={100}
//       y={100}
//     >
//       <ART.Shape d={new ART.Path().moveTo(0, 0).lineTo(200, 200)} stroke="black" strokeWidth={10} />
//     </ART.ClippingRectangle>
// </ART.Group>
// {/* 第十三组 Shape svg 值 */}
// <ART.Group x={0} y={1200}>
// <ART.Shape
//       stroke="#ff0000" // 描边的颜色
//       strokeWidth={2} // 描边的宽度
//                 // d={new ART.Path().moveTo(100, 50).arcTo(200, 50, 50).arcTo(100, 50, 50)}
//       d="M123,.16c36.58-.71,70.44,1,102,6,13.42,2.14,28.67-4.46,32,7,2.61,9-13.92,32.74-19,36l-12,3C209.92,67,186.19,143,180,171.16c-3.19,14.43-9.42,36.06-2,48,44.27,9.9,76-40,101-39l1,2c2.34,29.21-109.13,89.76-144,79-27.46-69.43,43.56-162.42,63-211v-1c-59.61-2.63-140.8-15.75-174,21-.38,28.16,17.27,27,31,40,1.35,44.31-40.85,41.54-53,9-16.52-44.23,40-94.3,67-106C85.79,6.3,105.21,7.17,123,.16Z"
//     />
// </ART.Group>
