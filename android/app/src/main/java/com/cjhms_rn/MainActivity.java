package com.cjhms_rn;

import com.facebook.react.ReactActivity;
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;
import com.rnimmersive.RNImmersiveModule;
import com.umeng.analytics.MobclickAgent;

import android.app.mia.MiaMdmPolicyManager;

/** */
import android.content.Context;
import android.view.WindowManager;
import android.content.pm.ActivityInfo;
import android.view.View;
/** */

import elinktek.common.*;

public class MainActivity extends ReactActivity {

    /**联想TAB3定制机修改*/
    MiaMdmPolicyManager miaMdmPolicyManager;
    /** ELink 爱立顺定制机修改*/
    private elinktek.common.Utils alsUtils;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "cjhms_rn";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this, true);
        initSet();
        super.onCreate(savedInstanceState);
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);

        if (hasFocus && RNImmersiveModule.getInstance() != null) {
            RNImmersiveModule.getInstance().emitImmersiveStateChangeEvent();
        }
    }

    // 友盟统计SDK
    // @Override
    // public void onResume() {
    // super.onResume();
    // MobclickAgent.onResume(this);
    // }

    // 友盟统计SDK
    @Override
    public void onPause() {
        super.onPause();
        MobclickAgent.onPause(this);
    }

      
    @Override
    protected void onResume() {
        super.onResume();
        MobclickAgent.onResume(this);

        enableSystemBar(this,false);
        // 屏蔽电源键
        if (MainApplication.isLenovoTab3()) {
            //屏蔽短按
            miaMdmPolicyManager.setControlPower(false);
            //屏蔽长按
            miaMdmPolicyManager.setControlPowerLong(false);
        }
        // ELink 爱立顺定制机修改
        if (MainApplication.isELinkH8()) {
            // 使电源键无效
            alsUtils.disableShortPressPower();
            alsUtils.disableLongPressPower();
        }
    }


    private void initSet() {
        getWindow().addFlags(WindowManager.LayoutParams.
                FLAG_KEEP_SCREEN_ON);   //应用运行时，保持屏幕高亮，不锁屏
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
        // setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE); // 强制横屏
        //隐藏虚拟按键
        getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
               | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION // hide nav
                // bar
                | View.SYSTEM_UI_FLAG_FULLSCREEN// hide status bar
                | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
    }


    public void enableSystemBar(Context context, boolean enable) {
        // 使能状态栏及导航栏
        if (MainApplication.isLenovoTab3()) {
            if (miaMdmPolicyManager == null) {
                miaMdmPolicyManager = new MiaMdmPolicyManager(MainActivity.this);
            }
            miaMdmPolicyManager.setNavigaBar(!enable);
            miaMdmPolicyManager.setStatusBar(!enable);
        }
        // ELink 爱立顺定制机修改
        if (MainApplication.isELinkH8()) {
            // ELink 爱立顺定制机修改
            if (alsUtils == null) {
                alsUtils = new elinktek.common.Utils(MainActivity.this);
            }
            if (enable) {
                alsUtils.enableNavigation();
            } else {
                alsUtils.disableNavigation();
            }
            alsUtils.disableStatusbar();
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        // 重新开启电源键功能
        if (MainApplication.isLenovoTab3()) {
            //允许短按
            miaMdmPolicyManager.setControlPower(true);
            //允许长按
            miaMdmPolicyManager.setControlPowerLong(true);
        }
        // // ELink 爱立顺定制机修改
        if (MainApplication.isELinkH8()) {
            alsUtils.enableShortPressPower();  //允许短按
            alsUtils.enableLongPressPower(); //允许长按

        }
        enableSystemBar(this,true);
    }
}
