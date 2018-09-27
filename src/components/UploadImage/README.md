### options参数
                | 参数          | Ios | Android | 说明 | 类型 | 默认 |
| -------- | :----- | :---- |:---- |
| title                         | OK | OK | 值为 null 或为空时，不设title  |  string
| cancelButtonTitle             | OK | OK | 值为 null 或为空时，不设此btn  |  string
| takePhotoButtonTitle          | OK | OK | 值为 null 或为空时，不设此btn  |  string
| chooseFromLibraryButtonTitle  | OK | OK | 值为 null 或为空时，不设此btn  |  string
| customButtons                 | OK | OK | 包含有btn名称和标题的对象的数组 |  array
| cameraType                    | OK | -  | 前或后摄像头 'front' or 'back'| string
| mediaType                     | OK | OK | 'photo' or 'video' |
| maxWidth                      | OK | OK | 仅适用图片 | number
| maxHeight                     | OK | OK | 仅适用图片 | number
| quality                       | OK | OK | 0-1 仅适用图片 | number
| videoQuality                  | OK | OK | 'low' or 'high' | string
| durationLimit                 | OK | OK | 最大视频录制时间，秒为单位 | number
| rotation                      | -  | OK | 0-360deg 仅适用图片 | number 
| allowsEditing                 | OK | -  | 支持内建的iOS功能，选择图像后调整大小 | bool
| noData                        | OK | OK | 为true时禁止生成base64数据字段(提高了照片的性能) | bool
| storageOptions                | OK | OK | 提供此值时，图像将保存在iOS上的应用程序文档目录或Android上的应用程序图片目录(而不是临时目录) |
| storageOptions.skipBackup     | OK | -  | 为true时，图片不会备份到iCloud |
| storageOptions.path           | OK | -  | 若设置此值，图像将保存在iOS上的应用程序文档目录或Android上的应用程序图片目录(而不是临时目录) |
| storageOptions.cameraRoll     | OK | OK | 为true时，裁剪后的照片会保存到iOS Camera Roll或Android DCIM文件夹中。 |
| storageOptions.waitUntilSaved | OK | -  | 为true时，将延迟响应回调，直到照片/视频保存到相机卷。如果照片或视频是刚刚拍摄的，那么只有当这个和cameraRoll都为true时，才会在响应对象中提供文件名和时间戳字段。 |
| permissionDenied.title        | -  | OK | 说明权限对话框的标题 |
| permissionDenied.text         | -  | OK | 说明权限对话框的消息。默认情况下，可以用你的相机拍照，并从你的库中选择图片。 |
| permissionDenied.reTryTitle   | -  | OK | 重试btn文字 |
| permissionDenied.okTitle      | -  | OK | OK文字 |

### 帮助函数
- 启动相机:
ImagePicker.launchCamera(options, (response)  => {
  // Same code as in above section!
});

- 打开图片库:
ImagePicker.launchImageLibrary(options, (response)  => {
  // Same code as in above section!
});

###示例代码
var ImagePicker = require('react-native-image-picker');

// More info on all the options is below in the README...just some common use cases shown here
var options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

/**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info below in README)
 */
ImagePicker.showImagePicker(options, (response) => {
  console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled image picker');
  }
  else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  }
  else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  }
  else {
    let source = { uri: response.uri };

    // You can also display the image using data:
    // let source = { uri: 'data:image/jpeg;base64,' + response.data };

    this.setState({
      avatarSource: source
    });
  }
});