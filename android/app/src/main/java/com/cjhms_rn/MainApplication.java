package com.cjhms_rn;

import android.app.Application;
import android.webkit.WebView; 
import com.horcrux.svg.SvgPackage;

import com.facebook.react.ReactApplication;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import com.oblador.vectoricons.VectorIconsPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new SplashScreenReactPackage(),
          new VectorIconsPackage(),
          new SvgPackage()
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
