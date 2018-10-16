package com.cjhms_rn;

import com.facebook.react.ReactActivity;
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;
import com.rnimmersive.RNImmersiveModule;

public class MainActivity extends ReactActivity {

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
        super.onCreate(savedInstanceState);
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);

        if (hasFocus && RNImmersiveModule.getInstance() != null) {
            RNImmersiveModule.getInstance().emitImmersiveStateChangeEvent();
        }
    }

    public void onResume() {
    super.onResume();
    MobclickAgent.onResume(this);
    }
    public void onPause() {
    super.onPause();
    MobclickAgent.onPause(this);
    }
}
