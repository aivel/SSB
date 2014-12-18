package mygame;

import com.jme3.app.SimpleApplication;
import com.jme3.input.ChaseCamera;
import com.jme3.material.Material;
import com.jme3.math.ColorRGBA;
import com.jme3.math.Vector3f;
import com.jme3.renderer.RenderManager;
import com.jme3.renderer.queue.RenderQueue.Bucket;
import com.jme3.scene.Geometry;
import com.jme3.scene.shape.Box;
import com.jme3.scene.shape.Sphere;
import com.jme3.util.SkyFactory;

/**
 * test
 * @author normenhansen
 */
public class Main extends SimpleApplication {

    public static void main(String[] args) {
        Main app = new Main();
        app.start();
    }

    @Override
    public void simpleInitApp() {
        Sphere b = new com.jme3.scene.shape.Sphere(200, 200, 1);
        Geometry geom = new Geometry("Box", b);
 
        Material mat = new Material(assetManager, "MatDefs/Unshaded.j3md"); //”Common/MatDefs/Misc/Unshaded.j3md”);//”MatDefs/bubbleMat.j3md”);
        mat.setTexture("SkyBox", assetManager.loadTexture("Textures/BrightSky.dds"));
        mat.setTexture("ColorMap", assetManager.loadTexture("Textures/rainbow.png"));
        mat.setFloat("Shininess", 20f);
        mat.setColor("SpecularColor", ColorRGBA.Blue);
        mat.setBoolean("UseSpecularNormal", true);
       
        geom.setMaterial(mat);
        geom.setQueueBucket(Bucket.Transparent);
 
        rootNode.attachChild(geom);
        rootNode.attachChild(SkyFactory.createSky(
            assetManager, "Textures/BrightSky.dds", false));
 
        flyCam.setEnabled(false);
        ChaseCamera chaseCam = new ChaseCamera(cam, geom, inputManager);
    }

    @Override
    public void simpleUpdate(float tpf) {
        //TODO: add update code
    }

    @Override
    public void simpleRender(RenderManager rm) {
        //TODO: add render code
    }
}
