package com.loginProject.login_backend.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

record LoginRequest(String username, String password){}
record LoginResponse(String message) {}


@CrossOrigin
@RestController //indica que esta clase recibe peticiones web
@RequestMapping("/api/login") //url base de este controlador
public class LoginController {


    @PostMapping
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest){

        //en el futuro vendran de una bbdd
        //datos hardcodeados para hacer comparativa con los datos que vienen de la peticion
        String usuarioCorrecto = "admin";
        String passwordCorrecto = "1234";

        if(usuarioCorrecto.equals(loginRequest.username()) && passwordCorrecto.equals(loginRequest.password())){

            System.out.println("Login exitoso, " + loginRequest.username());
            return ResponseEntity.ok(new LoginResponse("Login exitoso"));
        } else{
            System.out.println("Intento fallido de login, " + loginRequest.username());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginResponse("Usuario o password incorrectos"));
        }
    }

}
