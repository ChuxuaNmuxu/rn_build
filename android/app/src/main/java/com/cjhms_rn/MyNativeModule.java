package com.cjhms_rn;

import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import static android.widget.Toast.*;

import android.view.View;

/**
 * @author Xia WeiHao
 * @create 2018/10/26
 * @Describe
 */
public class MyNativeModule extends ReactContextBaseJavaModule {
    public MyNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "MyNativeModule";
    }

    @ReactMethod
    public void show(String message, int duration) {
        makeText(getReactApplicationContext(), message, duration).show();

        // getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_STABLE
        // | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
        // | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
        // //| View.SYSTEM_UI_FLAG_HIDE_NAVIGATION // hide nav
        // // bar
        // | View.SYSTEM_UI_FLAG_FULLSCREEN// hide status bar
        // | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
    }

    @Override
    public boolean canOverrideExistingModule() {
        return true;
    }
}
