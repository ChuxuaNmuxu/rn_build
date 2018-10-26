//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package elinktek.common;

import android.content.Context;
import android.content.Intent;
import android.provider.Settings.System;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public final class Utils {
    private Context mContext;
    private Intent intent;

    public Utils(Context context) {
        this.mContext = context;
    }

    public void rebootDevice() {
        this.intent = new Intent("reboot.device");
        this.mContext.sendBroadcast(this.intent);
    }

    public void shutdownDevice() {
        this.intent = new Intent("shutdown.device");
        this.mContext.sendBroadcast(this.intent);
    }

    public void enableApp(String packageName) {
        this.intent = new Intent("enable.application");
        this.intent.putExtra("pkg_name", packageName);
        this.mContext.sendBroadcast(this.intent);
    }

    public void disableApp(String packageName) {
        this.intent = new Intent("disable.application");
        this.intent.putExtra("pkg_name", packageName);
        this.mContext.sendBroadcast(this.intent);
    }

    public void enableStatusbar() {
        this.intent = new Intent("show.statusbar");
        this.intent.putExtra("status", 1);
        this.mContext.sendBroadcast(this.intent);
    }

    public void disableStatusbar() {
        this.intent = new Intent("show.statusbar");
        this.intent.putExtra("status", 0);
        this.mContext.sendBroadcast(this.intent);
    }

    public void enableNavigation() {
        this.intent = new Intent("android.intent.action.SHOW_NAVIGATION_BAR");
        this.mContext.sendBroadcast(this.intent);
    }

    public void disableNavigation() {
        this.intent = new Intent("android.intent.action.HIDE_NAVIGATION_BAR");
        this.mContext.sendBroadcast(this.intent);
    }

    public void enableVolume() {
        this.intent = new Intent("enable.volume.press");
        this.mContext.sendBroadcast(this.intent);
    }

    public void disableVolume() {
        this.intent = new Intent("disable.volume.press");
        this.mContext.sendBroadcast(this.intent);
    }

    public void enableShortPressPower() {
        this.intent = new Intent("enable.power.press");
        this.mContext.sendBroadcast(this.intent);
    }

    public void disableShortPressPower() {
        this.intent = new Intent("disable.power.press");
        this.mContext.sendBroadcast(this.intent);
    }

    public void enableLongPressPower() {
        this.intent = new Intent("enable.power.long.press");
        this.mContext.sendBroadcast(this.intent);
    }

    public void disableLongPressPower() {
        this.intent = new Intent("disable.power.long.press");
        this.mContext.sendBroadcast(this.intent);
    }

    public void silentInstall(String path) {
        this.intent = new Intent("install.application");
        this.intent.putExtra("path_name", path);
        this.mContext.sendBroadcast(this.intent);
    }

    public void silentUnInstall(String packageName) {
        this.intent = new Intent("uninstall.application");
        this.intent.putExtra("pkg_name", packageName);
        this.mContext.sendBroadcast(this.intent);
    }

    public void disableApkWhiteListMode() {
        this.setApkWhiteListEnable(false, (String)null);
    }

    private void setApkWhiteListEnable(boolean enable, String packageNames) {
        this.intent = new Intent("update.apk.whitelist");
        this.intent.putExtra("white_list_on", enable);
        if(enable) {
            this.intent.putExtra("white_list", packageNames);
        }

        this.mContext.sendBroadcast(this.intent);
        if(!enable) {
            this.intent = new Intent("save.white.list");
            this.intent.putExtra("type", "apk");
            this.intent.putExtra("white_list", "");
            this.mContext.sendBroadcast(this.intent);
        }

    }

    public void insertApkWhiteList(List<String> apks) {
        StringBuilder whiteList = new StringBuilder("");
        Iterator var3 = apks.iterator();

        while(var3.hasNext()) {
            String apk = (String)var3.next();
            whiteList.append(apk).append(",");
        }

        this.insertApkWhiteList(whiteList.toString().substring(0, whiteList.length() - 1));
    }

    private void insertApkWhiteList(String packageNames) {
        this.intent = new Intent("update.apk.whitelist");
        this.intent.putExtra("white_list_on", true);
        this.intent.putExtra("is_append", false);
        this.intent.putExtra("white_list", packageNames);
        this.mContext.sendBroadcast(this.intent);
        List<String> apkList = new ArrayList();
        String[] var3 = packageNames.split(",");
        int var4 = var3.length;

        for(int var5 = 0; var5 < var4; ++var5) {
            String apk = var3[var5];
            if(!apkList.contains(apk)) {
                apkList.add(apk);
            }
        }

        StringBuilder whiteList = new StringBuilder("");
        Iterator var8 = apkList.iterator();

        while(var8.hasNext()) {
            String apk = (String)var8.next();
            whiteList.append(apk).append(",");
        }

        this.intent = new Intent("save.white.list");
        this.intent.putExtra("type", "apk");
        this.intent.putExtra("white_list", whiteList.toString().substring(0, whiteList.length() - 1));
        this.mContext.sendBroadcast(this.intent);
    }

    public List<String> getApkWhiteList() {
        List<String> apkList = new ArrayList();
        String apks = System.getString(this.mContext.getContentResolver(), "apk_list");
        if(null != apks && !"".equals(apks)) {
            String[] var3 = apks.split(",");
            int var4 = var3.length;

            for(int var5 = 0; var5 < var4; ++var5) {
                String apk = var3[var5];
                if(!apkList.contains(apk)) {
                    apkList.add(apk);
                }
            }

            return apkList;
        } else {
            return apkList;
        }
    }

    public void modifySystemTime(long milliSecond) {
        this.intent = new Intent("modify.system.time");
        this.intent.putExtra("millisecond", milliSecond);
        this.mContext.sendBroadcast(this.intent);
    }
}
