package io.github.claudiojunior9662.agendaapi.model.api.rest;

import io.github.claudiojunior9662.agendaapi.model.entity.Contato;
import io.github.claudiojunior9662.agendaapi.model.repository.ContatoRepository;
import jakarta.servlet.http.Part;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.hibernate.service.spi.ServiceException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.InputStream;
import java.net.http.HttpResponse;
import java.util.List;

@RestController
@RequestMapping("/api/contatos")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ContatoController {

    private final ContatoRepository contatoRepository;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Contato save(@RequestBody Contato contato) {
        return contatoRepository.save(contato);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        contatoRepository.deleteById(id);
    }

    @GetMapping
    public Page<Contato> list(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "10") Integer size
    ) {
        Sort sort = Sort.by(Sort.Direction.ASC, "nome");
        return contatoRepository.findAll(PageRequest.of(page, size, sort));
    }

    @PatchMapping("{id}/favorito")
    public void favorite(@PathVariable Integer id) {
        contatoRepository.findById(id).map(contato -> {
           contato.setFavorito(!(contato.getFavorito() == Boolean.TRUE));
           return contato;
        }).map(contatoRepository::save)
        .orElseThrow(() -> new ServiceException("Contato não encontrado."));
    }

    @PutMapping("{id}/foto")
    public byte[] addPhoto(@PathVariable Integer id, @RequestParam("foto") Part file) {
        return contatoRepository.findById(id).map(c -> {
           try {
               InputStream is = file.getInputStream();
               byte[] bytes = new byte[(int) file.getSize()];
               IOUtils.readFully(is, bytes);
               c.setFoto(bytes);
               contatoRepository.save(c);
               is.close();
               return bytes;
           }catch (IOException e) {
                return null;
           }
        }).orElseThrow(() -> new ServiceException("Contato não encontrado."));
    }
}