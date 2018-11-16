package com.cjhms_rn;

// import android.widget.Toast;

// import com.facebook.react.bridge.ReactApplicationContext;
// import com.facebook.react.bridge.ReactContextBaseJavaModule;
// import com.facebook.react.bridge.ReactMethod;

// import static android.widget.Toast.*;

// import android.view.View;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.view.View;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


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
    public void show() {
        // makeText(getReactApplicationContext(), message, duration).show();

        getCurrentActivity().getWindow().getDecorView().setSystemUiVisibility(
            View.SYSTEM_UI_FLAG_LAYOUT_STABLE |
                    View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION |
                    View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN |
                    View.SYSTEM_UI_FLAG_FULLSCREEN | // hide status bar
                    View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY |
                    View.SYSTEM_UI_FLAG_HIDE_NAVIGATION); // hide nav

        // AlertDialog.Builder builder = new AlertDialog.Builder(getCurrentActivity());
        // // 设置参数
        // builder.setTitle("标题").setIcon(R.mipmap.ic_launcher)
        //         .setMessage("信息")
        //         .setPositiveButton("确定", new DialogInterface.OnClickListener() {// 积极
        //             @Override
        //             public void onClick(DialogInterface dialog,
        //                                 int which) {
        //             // TODO Auto-generated method stub
        //                 Toast.makeText(getReactApplicationContext(), "确定", Toast.LENGTH_SHORT)
        //                         .show();
        //             }
        //         }).setNegativeButton("取消", new DialogInterface.OnClickListener() {// 消极
        //     @Override
        //     public void onClick(DialogInterface dialog,
        //                         int which) {
        //         // TODO Auto-generated method stub
        //         Toast.makeText(getReactApplicationContext(), "取消", Toast.LENGTH_SHORT)
        //                 .show();
        //     }
        // });
        // builder.create().show();
    }

    @Override
    public boolean canOverrideExistingModule() {
        return true;
    }
}
