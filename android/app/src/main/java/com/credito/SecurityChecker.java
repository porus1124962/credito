package com.credito;

import android.widget.Toast;
import java.io.*;
import java.net.UnknownHostException;

import android.content.pm.Signature;
import android.content.pm.PackageManager;
import android.content.Context;
import android.content.pm.PackageManager.NameNotFoundException;
import android.content.pm.ApplicationInfo;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;
import java.util.HashMap;

public class SecurityChecker extends ReactContextBaseJavaModule {
    
    public SecurityChecker(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "AppSecurityChecker";
    }

    @ReactMethod
    public void adBlockChecker(Callback successCallback,Callback errorCallback){

        BufferedReader in = null;
        boolean result = false;
    
        try 
        {
            in = new BufferedReader(new InputStreamReader(new FileInputStream("/etc/hosts")));
            String line;
    
            while ((line = in.readLine()) != null)
            {
                if (line.contains("admob"))
                {
                    result = true;
                    break;
                }
            }
        }catch (UnknownHostException e) 
        {
            errorCallback.invoke("Error1 " + e.toString()); 
        }catch (IOException e) 
        {
            errorCallback.invoke("Error2 " + e.toString());
            e.printStackTrace();
        }
        successCallback.invoke(result);
    }

    @ReactMethod
    public void appSignatureChecker(Callback successCallback){
        Context context = getReactApplicationContext();
        try
        {
            Signature[] signatures = context.getPackageManager().getPackageInfo(context.getPackageName(), PackageManager.GET_SIGNATURES).signatures;
            String sig = signatures[0].toCharsString();
            successCallback.invoke(sig);
        }
        catch (NameNotFoundException ex)
        {
            // Must never fail, so if it does, means someone played with the apk, so kill the process
            successCallback.invoke("Fail");
        }
    }

    @ReactMethod
    public void appKiller(){
        android.os.Process.killProcess(android.os.Process.myPid());
    }
}