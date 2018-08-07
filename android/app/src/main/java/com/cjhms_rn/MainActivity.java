package com.cjhms_rn;

import com.facebook.react.ReactActivity;
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;
import android.app.mia.MiaMdmPolicyManager;

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
        initSet();
        SplashScreen.show(this, true);
        super.onCreate(savedInstanceState);
    }


      
    @Override
    protected void onResume() {
        super.onResume();
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
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
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
        if (App.isLenovoTab3()) {
            if (miaMdmPolicyManager == null) {
                miaMdmPolicyManager = new MiaMdmPolicyManager(App.getContext());
            }
            miaMdmPolicyManager.setNavigaBar(!enable);
            miaMdmPolicyManager.setStatusBar(!enable);
        }
        // ELink 爱立顺定制机修改
        if (App.isELinkH8()) {
            // ELink 爱立顺定制机修改
            if (alsUtils == null) {
                alsUtils = new elinktek.common.Utils(App.getContext());
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
        if (App.isLenovoTab3()) {
            //允许短按
            miaMdmPolicyManager.setControlPower(true);
            //允许长按
            miaMdmPolicyManager.setControlPowerLong(true);
        }
        // ELink 爱立顺定制机修改
        if (App.isELinkH8()) {
            alsUtils.enableShortPressPower();  //允许短按
            alsUtils.enableLongPressPower(); //允许长按

        }
        enableSystemBar(this,true);
    }

}
