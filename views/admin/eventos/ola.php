<?php

public static function phieditar(Router $router) {
        if(!is_admin()) {
            header('Location: /');
        }

        $alertas = [];
        $id = $_GET['id'];

        $categoria = Categorias::find($id);
        $imagenes = Imagenes::find($categoria->imagen_id);

        $categoria->imagen_actual = $imagenes->imagen;

        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            if(!is_admin()) {
                header('Location: /');
            }

            if(!empty($_FILES['imagen']['tmp_name'])) {
                $carpeta_imagenes = '../public/build/img/phiCateg';
                
                //Crear carpeta si no existe
                if(!is_dir($carpeta_imagenes)) {
                    mkdir($carpeta_imagenes, 0755, true);
                }

                $imagen_png = Image::make($_FILES['imagen']['tmp_name'])->fit(800,800)->encode('png', 80);
                $imagen_webp = Image::make($_FILES['imagen']['tmp_name'])->fit(800,800)->encode('webp', 80);

                $nombre_imagen = md5(uniqid(rand(), true));
                $imagenes->imagen = $nombre_imagen;
                $categoria->imagen_nueva = $nombre_imagen;
            } else {
                $categoria->imagen_nueva = $categoria->imagen_actual;
            }

            $categoria->nombre = $_POST['nombre'];
            $alertas = $categoria->validarEdit();

            if(empty($alertas)) {
                $categoria->descripcion = $_POST['descripcion'];
                $categoria->descripcion = $_POST['descripcion'];
                $categoria->menu_id = $_POST['menu_id'];
                if(isset($nombre_imagen)) {
                    $imagen_png->save($carpeta_imagenes . '/' . $nombre_imagen . ".png");
                    $imagen_webp->save($carpeta_imagenes . '/' . $nombre_imagen . ".webp");
                    $resultadoImg = $imagenes->guardar();
                    if($resultadoImg) {
                        $imagen = Imagenes::where('imagen', $nombre_imagen);
                        $categoria->imagen_id = $imagen->id;
                        $resultado = $categoria->guardar();
                        if($resultado) {
                            header('Location: /admin/productos/phi');
                        }
                    }
                } else {
                    $resultado = $categoria->guardar();
                    if($resultado) {
                        header('Location: /admin/productos/phi');
                    }
                }            
            }
        }
                
        $router->render('admin/productos/phieditar', [
            'titulo' => 'Editar categoria',
            'alertas' => $alertas,
            'categoria' => $categoria
        ]);
    }
