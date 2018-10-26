package android.app.mia;
import android.content.Context;
import android.graphics.Bitmap;
import android.util.Log;

import java.util.List;


/**
 * @author
 * @create
 * @Describe
 */
public class MiaMdmPolicyManager {

	private static final Bitmap BITMAP = null;
	private List list;

	public MiaMdmPolicyManager(Context context) {
		// TODO Auto-generated constructor stub
	}

	/**yes*/
	public void shutDown() {
	};

	/** yes*/
	public boolean isLocationServiceForced() {
		return false;
	};

	/** yes*/
	public boolean forceLocationService(boolean allow) {
		return false;
	};

	/** yes*/
	public boolean allowBluetoothDataTransfer(boolean allow) {
		return false;
	};

	/** yes*/
	public boolean isBluetoothDataTransferAllowed() {
		return false;
	};

	/** yes*/
	public boolean isWifiAllowed() {
		return false;
	};

	/** yes*/
	public boolean allowWifi(boolean allow) {
		return false;
	};

	/** yes*/
	public void reBoot() {
	};

	/** yes*/
	public void reset() {
	};

	/** no*/
	public void setMultiWindow(boolean iscontrol) {
	};

	/** yes*/
	public void setHomeKey(boolean iscontrol) {
	};

	/** yes*/
	public void setRecentKey(boolean iscontrol) {
	};

	/** yes*/
	public void setNavigaBar(boolean iscontrol) {
	};

	/** yes*/
	public void setBackKey(boolean iscontrol) {
	};
	public boolean isControlModeSwitchKey(){
		return false;
	};
	public void setModeSwitchKey(boolean iscontrol){
	};
	/** yes*/
	public void setStatusBar(boolean iscontrol) {
	};

	/** yes*/
	public void setInstall(boolean iscontrol) {
	};

	/** yes*/
	public void setUninstall(boolean iscontrol) {
	};

	/** yes*/
	public void setTFcard(boolean iscontrol) {
	};

	/** yes*/
	public boolean isForbidTFcard() {
		return false;
	};

	/** yes*/
	public void setCamera(boolean iscontrol) {
	};

	/** yes*/
	public boolean isForbidCamera() {
		return false;
	};

	/** yes*/
	public void setScreenCaptureKey(boolean iscontrol) {
	};

	/** yes*/
	public boolean isForbidScreenCaptureKey() {
		return false;
	};

	/** yes*/
	public boolean isControlmiaNavigaView() {
		return false;
	};

	/** yes*/
	public boolean isControlRecentsKey() {
		return false;
	};

	/** yes*/
	public boolean isControlBackKey() {
		return false;
	};

	/** yes*/
	public boolean isControlHomeKey() {
		return false;
	};

	/** yes*/
	public boolean isControlStatus() {
		return false;
	};


	public boolean silentUnInstall(String packageName) {
		return false;
	};

	/** yes*/
	public boolean silentInstall(String apkPath) {
		Log.d("bailu", "silent_install_test");
		return false;
	};

	/** yes*/
	public boolean setOnlyCharging(boolean iscontrol) {
		return false;
	};

	/** yes*/
	public boolean isUsbOnlyCharging() {
		return false;
	};

	/** yes*/
	public void clearDefaults(String packageName) {
	};

	/** yes*/
	public boolean updateSystemTime(String time) {
		return false;
	};

	/** yes*/
	public Bitmap getMiaScreen() {
		return BITMAP;
	};


	public boolean setCoerciveMute(boolean is) {
		return false;
	};

	public boolean isCoerciveMute() {
		return false;
	};

	public boolean controlClipboard(boolean isfreeze) {
		return false;
	};

	public boolean isControlClipboard() {
		return false;
	};

	public String getMiaBuildNumber() {
		return null;
	};

	public void masterClearAppData() {
	};

	public void masterClearInbulitSD() {
	};

	public boolean whiteAppListWrite(List<String> packageName) {
		return false;
	};

	public List<String> whiteAppListRead() {
		return null;
	};

	public boolean getControlAppList() {
		return false;
	};

	public void setControlAppList(boolean iscontrol) {
	};

	public void setControlPower(boolean iscontrol) {
	};
	public void setControlPowerLong(boolean iscontrol) {
	};
	/**
	 * @param ssid
	 *            wifi ssid
	 * @param password
	 *            wifi password
	 * @param type
	 *            1 = WIFICIPHER_NOPASS 2 = WIFICIPHER_WEP 3 = WIFICIPHER_WPA 3
	 *            is ofen used
	 * @return
	 */
	public boolean setDefaultWifi(String ssid, String password, int type) {
		return false;
	};

	/**
	 *
	 * @param mNumeric
	 * @return
	 */
	public List selectAPN(String mNumeric) {
		return list;
	};

	/**
	 *
	 * @param id
	 * @return
	 */
	public int deleteAPN(String id) {
		return -1;
	};

	/**
	 *
	 * @param name
	 * @param numeric
	 * @param mcc
	 * @param mnc
	 * @param apn
	 * @param user
	 * @param server
	 * @param password
	 * @param proxy
	 * @param port
	 * @param authtype
	 * @param type
	 * @return
	 */
	public int addAPN(String name, String numeric, String mcc, String mnc,
					  String apn, String user, String server, String password,
					  String proxy, String port, String authtype, String type) {
		return -1;
	};

	/**
	 *
	 * @param id
	 * @param name
	 * @param numeric
	 * @param mcc
	 * @param mnc
	 * @param apn
	 * @param user
	 * @param server
	 * @param password
	 * @param proxy
	 * @param port
	 * @param authtype
	 * @param type
	 * @return
	 */
	public int updateAPN(String id, String name, String numeric, String mcc,
						 String mnc, String apn, String user, String server,
						 String password, String proxy, String port, String authtype,
						 String type) {
		return -1;
	};

	/**
	 *
	 * @param id
	 */
	public void setDefalutApn(String id) {
	};

	public void setFullScreen(boolean allow) {
	};

	public void setModeSwitch(boolean iscontrol) {
	};

	public boolean isControlModeSwitch() {
		return false;
	};

	public void addBrowserControlUrl(List<String> netAdressList) {
	}
}
