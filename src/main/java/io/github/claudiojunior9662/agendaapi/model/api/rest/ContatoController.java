package io.github.claudiojunior9662.agendaapi.model.api.rest;

import io.github.claudiojunior9662.agendaapi.model.entity.Contato;
import io.github.claudiojunior9662.agendaapi.model.repository.ContatoRepository;
import lombok.RequiredArgsConstructor;
import org.hibernate.service.spi.ServiceException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contatos")
@RequiredArgsConstructor
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
    public List<Contato> list() {
        return contatoRepository.findAll();
    }

    @PatchMapping("{id}/favorito")
    public void favorite(@PathVariable Integer id, @RequestBody Boolean favorito) {
        contatoRepository.findById(id).map(contato -> {
           contato.setFavorito(favorito);
           return contato;
        }).map(contatoRepository::save)
        .orElseThrow(() -> new ServiceException("Contato não encontrado."));
    }
}
