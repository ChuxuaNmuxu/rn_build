package com.cjhms_rn;

import android.app.Application;
import android.webkit.WebView; 
import com.horcrux.svg.SvgPackage;

import com.facebook.react.ReactApplication;
import com.microsoft.codepush.react.CodePush;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.imagepicker.ImagePickerPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.rnimmersive.RNImmersivePackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import com.oblador.vectoricons.VectorIconsPackage;

import com.iamsb.wheelpicker.WheelPickerPackage;

import com.cjhms_rn.MyNativeReactPackage;
import com.masteratul.exceptionhandler.ReactNativeExceptionHandlerPackage;

import com.rnfs.RNFSPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
        return CodePush.getJSBundleFile();
        }
    
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          // 第一个参数是刚刚申请的key（可以根据环境配置）
          // 第四个参数是服务器的URL
          new CodePush("JzjK23SFxXW081603v6lNMFBLrRE4ksvOXqog", getApplicationContext(), BuildConfig.DEBUG, "http://119.23.68.231:3000"),
          new RNViewShotPackage(),
          new PickerPackage(),
          new ImagePickerPackage(),
          new RNI18nPackage(),
          new RNDeviceInfo(),
          new RNImmersivePackage(),
          new SplashScreenReactPackage(),
          new VectorIconsPackage(),
          new SvgPackage(),
          new WheelPickerPackage(),
          new MyNativeReactPackage(),
          new ReactNativeExceptionHandlerPackage(),
          new RNFSPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    WebView.setWebContentsDebuggingEnabled(true);
  }
  
  /** ELink 爱立顺定制机修改*/
  public static final String MODEL_LENOVO_TB3_850F = "Lenovo TB3-850F";
  public static final String MODEL_ELINK_H8631H8_8 = "H8631H8_8";
  public static boolean isLenovoTab3() {
      // 手机型号
      String model = android.os.Build.MODEL;
      return model.equals(MODEL_LENOVO_TB3_850F);
  }
  public static boolean isELinkH8() {
      // 手机型号
      String model = android.os.Build.MODEL;
      return model.equals(MODEL_ELINK_H8631H8_8);
  }
}
